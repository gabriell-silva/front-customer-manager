const baseUrl = process.env.API_URL;

async function getClients() {
  return await fetch(`${baseUrl}/clients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter clientes");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erro ao obter clientes:", error);
      throw error;
    });
}

async function getClientById(id: number) {
  return await fetch(`${baseUrl}/clients/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter cliente");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erro ao obter cliente:", error);
      throw error;
    });
}

async function createClient(dataForm: Object) {
  return await fetch(`${baseUrl}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao criar cliente");
      }
      
      return response.json();
    })
    .catch((error) => {
      console.error("Erro ao criar cliente:", error);
      throw error;
    });
}


async function updateClient(id: number, dataForm: Object) {
  return await fetch(`${baseUrl}/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar cliente");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erro ao atualizar cliente:", error);
      throw error;
    });
}

async function deleteClient(id: number) {
  return await fetch(`${baseUrl}/clients/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erro ao excluir cliente:", error);
      throw error;
    });
}

export { getClients, getClientById, createClient, updateClient, deleteClient };
