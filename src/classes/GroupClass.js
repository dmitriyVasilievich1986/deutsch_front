import Ajv from 'ajv'

const ajv = new Ajv()
const groupValidator = ajv.compile({
    type: "object",
    properties: {
        name: { type: "string" },
        id: { type: "integer" },
    },
    additionalProperties: false,
    required: ["id", "name"]
})

export default groupValidator