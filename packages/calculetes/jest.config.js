module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
	moduleFileExtensions: ["ts", "js", "json", "node"],
	coverageDirectory: "coverage",
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*.{ts,js}",
		"!src/index.ts", // Exclude entry point from coverage
	],
};
