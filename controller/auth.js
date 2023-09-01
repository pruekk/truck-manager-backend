const z = require("zod");

// function ThaiNationalID(id) {
//   if (id == null || id.length !== 13 || !/^[0-9]\d+$/.test(id)) return false;
//   let sum = 0;
//   for (let i = 0, sum = 0; i < 12; i++) {
//     sum += parseInt(id.charAt(i)) * (13 - i);
//   }
//   let check = (11 - (sum % 11)) % 10;
//   if (check === parseInt(id.charAt(12))) {
//     return true;
//   }
//   return false;
// }

const validateEmail = z.string().email();
// const validateCitizenId = z
//   .string()
//   .refine((value) => ThaiNationalID(value), "Invalid Citizen ID");

const reqSchema = z.object({
  email: validateEmail,
  // citizenId: validateCitizenId,
});

function validateInput(input) {
  const schemaCheck = reqSchema.safeParse(input);
  return { ...schemaCheck, data: input };
}

module.exports = { validateInput };
