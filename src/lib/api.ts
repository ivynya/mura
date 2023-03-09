import type { Mura } from "./mura";

export async function validateMuraID(id: string) {
  return await fetch(`http://localhost:3000/create/${id}`);
}

export async function createMura(options: Mura) {
  console.log(options);
  return await fetch('http://localhost:3000/create', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
}