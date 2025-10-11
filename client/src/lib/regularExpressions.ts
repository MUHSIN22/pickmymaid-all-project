const regex = {
  isUrl: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
  isEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

export default regex;