const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDOqetnlXPVscAtbvb8sfZCCl5d2XfiAvI");
export const model = genAI.getGenerativeModel({model:"gemini-pro"})
// ...