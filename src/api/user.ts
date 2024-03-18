const baseUrl = process.env.API_URL;

async function signIn(dataForm: Object) {
  return await fetch(`${baseUrl}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao logar no sistema");
      }
      
      return response.json();
    })
    .catch((error) => {
      console.error("Erro ao logar no sistema:", error);
      throw error;
    });
}

async function signOut(token: string) {
  return await fetch(`${baseUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao sair do sistema");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erro ao sair do sistema:", error);
      throw error;
    });
}

export { signIn, signOut };
