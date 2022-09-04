const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
});

module.exports = withPWA({
	i18n: {
		locales: ["ru"],
		defaultLocale: "ru",
	},
});
