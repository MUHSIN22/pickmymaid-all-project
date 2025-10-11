/**
 * The `slugify` function takes a string input, converts it to lowercase, removes special characters,
 * replaces spaces with hyphens, and cleans up any extra hyphens at the beginning or end to create a
 * URL-friendly slug.
 * @param {string} str - The `str` parameter in the `slugify` function is a string that you want to
 * convert into a slug. The function converts the string to lowercase, removes any special characters
 * except for spaces and hyphens, replaces spaces with hyphens, removes consecutive hyphens, and trims
 * @returns The `slugify` function takes a string as input and returns a slugified version of that
 * string. The returned value is the input string converted to lowercase, with special characters
 * removed, spaces replaced with hyphens, consecutive hyphens reduced to a single hyphen, and any
 * leading or trailing hyphens removed.
 */
export const slugify = (str:string ) => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }