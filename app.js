import express from "express";

const app = express();
app.use(express.json());

const produtos = [
    {
        id: 1,
        produto: "Bolo Red Velvet",
        preço: "R$17.80",
    }, 
    {
        id: 1,
        produto: "Morangoffe",
        preço: "R$19.50",
    },
    {
        id: 1,
        produto: "Cookie Doce de Leite",
        preço: "R$9.90",
    },
]

function buscaProduto(id){
    return produtos.findIndex(produtos => {
        return produtos.id === Number(id);
    });
}

app.route("/produtos")
    .get((req, res) => {
        res.status(200).json(produtos);
    })
    .post((req, res) => {
    produtos.push(req.body);
        res.status(201).send("Cadastrado com sucesso!");
    })

app.route("/produtos/:id")
.get((req, res) => {
    const id = buscaProduto(req.params.id);
    res.status(200).json(produtos[id]);
})
.put((req, res) => {
    const id = buscaProduto(req.params.id);
    produtos[id].produto = req.body.produto;
    produtos[id].preço = req.body.preço;
    res.status(200).json(produtos[id]);
})
.delete((req, res) => {
    const id = buscaProduto(req.params.id);
    if(produtos[id]){
        produtos.splice(id, 1);
        res.status(200).send("Removido com sucesso!");
    } else {
        res.status(404).send("Carro não encontrado!");
    }
})

export default app;
