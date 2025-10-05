module.exports = {
  siteUrl: "https://www.pickmymaid.com",
  generateRobotsTxt: true,

  // You can still keep this if you want fallback
  transform: async (config, path) => {
    return null; // We will use additionalPaths only
  },

  additionalPaths: async (config) => {
    const staticPaths = [
      "/",
      "/about-us",
      "/contact-us",
      "/favorites",
      "/find-job",
      "/hiring-tips",
      "/how-it-works",
      "/press-appearance",
      "/pricing",
      "/privacy-policy",
      "/search",
      "/terms-and-conditions",
    ];

    // Mock dynamic pages
    let maids = await fetch("http://localhost:8080/api/v1/job/all-maids-seo");
    maids = await maids.json();
    console.log({ maids: maids?.data });
    const maidsPath = maids?.data?.map((maid) => ({
      loc: `/maid/${maid.name?.toLowerCase().split(" ").join("-")}/${
        maid.ref_number
      }`,
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));

    const allPaths = [
      ...staticPaths.map((path) => ({
        loc: `/${path}`,
        changefreq: "monthly",
        priority: path === "/" ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
      })),
      ...maidsPath,
    ];

    return allPaths;
  },
};
