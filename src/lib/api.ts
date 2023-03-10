import type { Mura, Participant } from "./mura";

const API_BASE = 'https://io.ivy.direct/mura';

export async function validateMuraID(id: string) {
  return await fetch(`${API_BASE}/create/${id}`);
}

export async function createMura(options: Mura) {
  console.log(options);
  return await fetch(`${API_BASE}/create`, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
}

export async function getMura(id: string) {
  const res = await fetch(`${API_BASE}/get/${id}`);
  return await res.json();
}

export async function createMuraParticipant(id: string, pID: string, p: Participant) {
  return await fetch(`${API_BASE}/create/${id}/${pID}`, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
}

export async function updateMuraParticipant(id: string, pID: string, p: Participant) {
  return await fetch(`${API_BASE}/update/${id}/${pID}`, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  });
}