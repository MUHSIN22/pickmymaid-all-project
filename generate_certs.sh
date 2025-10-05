#!/bin/bash
set -e

# ===========================
# CONFIGURATION
# ===========================
# List of staging subdomains
STAGING_DOMAINS=("staging.pickmymaid.com" "staging.admin.pickmymaid.com" "staging.api.pickmymaid.com")

CERTS_DIR="./haproxy/certs"
mkdir -p "$CERTS_DIR"

# ===========================
# Generate certificates
# ===========================
echo "⚠️  Make sure your staging domains are publicly reachable and you can do DNS validation for Let's Encrypt"

for DOMAIN in "${STAGING_DOMAINS[@]}"; do
    echo "-------------------------------"
    echo "Generating certificate for $DOMAIN"
    echo "Press ENTER to continue..."
    read

    # Generate cert using Let’s Encrypt (manual DNS challenge)
    sudo certbot certonly \
      --manual \
      --preferred-challenges=dns \
      --email your-email@example.com \
      --server https://acme-v02.api.letsencrypt.org/directory \
      -d "$DOMAIN"

    # Path may vary; adjust if needed
    LE_PATH="/etc/letsencrypt/live/$DOMAIN"

    if [ ! -f "$LE_PATH/privkey.pem" ]; then
        echo "Error: Certificate for $DOMAIN not found at $LE_PATH"
        exit 1
    fi

    # Combine privkey + fullchain for HAProxy
    cat "$LE_PATH/privkey.pem" "$LE_PATH/fullchain.pem" > "$CERTS_DIR/$DOMAIN.pem"

    echo "✅ HAProxy certificate for $DOMAIN generated at $CERTS_DIR/$DOMAIN.pem"
done

echo "All staging certificates generated successfully!"
echo "Use DOMAIN.pem files in your HAProxy staging config."
