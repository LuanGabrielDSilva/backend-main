import { hash } from "bcryptjs";

async function generate() {

  const hashed = await hash("123456", 10);

  console.log(hashed);
}

generate();