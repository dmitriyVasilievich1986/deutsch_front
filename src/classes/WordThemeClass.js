import Ajv from 'ajv'

const ajv = new Ajv()
const wordThemeValidator = ajv.compile({
    type: "object",
    properties: {
        theme: { type: "integer" },
        word: { type: "integer" },
        id: { type: "integer" },
    },
    additionalProperties: false,
    required: ["id", "word", "theme"]
})

export default wordThemeValidator