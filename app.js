//APIS e Rotas

// APIS do backend
// Exportar os dados
export default {
  data() {
    return {
      //Dados do servidor
      paes: null,
      carnes: null,
      opcionaisdata: null,

      //Dados enviados do formulários
      nome: null,
      pao: null,
      carne: null,
      opcionais: [],
      status: "Solicitado",

      //Dados após a realização do pedido
      burgers: null,
      burger_id: null,
      status: [],
    };
  },

  methods: {
    //listar os dados ingredientes
    async getIngredientes() {
      const req = await fetch("http://localhost:3000/ingredientes");
      const data = await req.json();

      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionaisdata = data.opcionais;
    },

    //Criar o pedido do burger
    async createBurger(e) {
      e.preventDefault();

      const data = {
        nome: this.nome,
        carne: this.carne,
        pao: this.pao,
        opcionais: this.opcionais,
        status: "Solicitado",
      };

      const dataJson = JSON.stringify(data); // Enviar como texto ao servidor

      const req = await fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      const res = await req.json();

      console.log(res);
    },

    // Vai listar Pedidos dos burgers
    async getPedidos() {
      const req = await fetch("http://localhost:3000/burgers");

      const data = await req.json();

      this.burgers = data;

      // Resgata os status de pedidos
      this.getStatus();
    },
  },

  // Vai listar Pedidos dos burgers por ID
  async getBurger(id) {
    const req = await fetch(`http://localhost:3000/burgers/${id}`, {
      method: "GET",
    });

    const res = await req.json();

    this.getPedidos();
  },

  // listar Status
  async getStatus() {
    const req = await fetch("http://localhost:3000/status");

    const data = await req.json();

    this.status = data;
  },

  //atualizar os pedidos do burgers
  async updateBurger(event, id) {
    const option = event.target.value; // Para saber o status de quem gerenciar os pedidos

    const dataJson = JSON.stringify({ status: option }); //Para atualizar no banco do json-server

    const req = await fetch(`http://localhost:3000/burgers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: dataJson,
    });

    const res = await req.json();

    console.log(res);
  },

  // deletar os burgers do pedido
  async deleteBurger(id) {
    const req = await fetch(`http://localhost:3000/burgers/${id}`, {
      method: "DELETE",
    });

    const res = await req.json();

    this.getPedidos();
  },
};

app.listen(3004);
