import Ajv from 'ajv'

const ajv = new Ajv()
const wordValidator = ajv.compile({
    type: "object",
    properties: {
        description: { type: ["string", "null"] },
        path: { type: ["string", "null"] },
        translate: { type: "string" },
        genus: { type: "string" },
        group: { type: "string" },
        word: { type: "string" },
        id: { type: "integer" },
        accusative: { type: ["string", "null"] },
        genitive: { type: ["string", "null"] },
        dative: { type: ["string", "null"] },
        pronoun_you_many: { type: ["string", "null"] },
        pronoun_they: { type: ["string", "null"] },
        pronoun_you: { type: ["string", "null"] },
        pronoun_he: { type: ["string", "null"] },
        pronoun_we: { type: ["string", "null"] },
        pronoun_i: { type: ["string", "null"] },
    },
    additionalProperties: false,
    required: [
        "description",
        "path",
        "translate",
        "genus",
        "group",
        "word",
        "id",
        "accusative",
        "genitive",
        "dative",
        "pronoun_you_many",
        "pronoun_they",
        "pronoun_you",
        "pronoun_he",
        "pronoun_we",
        "pronoun_i",
    ]
})

export default wordValidator