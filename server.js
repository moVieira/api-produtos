// Rota DELETE para remover um produto específico
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(p => String(p.id) === String(id));
    if (index === -1) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    produtos.splice(index, 1);
    res.json({ mensagem: 'Produto removido com sucesso!' });
});
// Rota PUT para atualizar
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const produto = produtos.find(p => String(p.id) === String(id));
    if (!produto) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    if (nome !== undefined) produto.nome = nome;
    if (preco !== undefined) produto.preco = preco;
    res.json({ mensagem: 'Produto atualizado com sucesso!', produto });
});

const express = require('express');
const app = express();
app.use(express.json());

// Array vazio pra armazenar 
let produtos = [];


app.get('/', (req, res) => {
    res.send('Api de produtos funcionando!');
});

// POST para adicionar os produto
app.post('/produtos', (req, res) => {
    const { id, nome, preco } = req.body;
    if (typeof id === 'undefined' || !nome || typeof preco === 'undefined') {
        return res.status(400).json({ erro: 'id, nome e preco são obrigatórios' });
    }
    produtos.push({ id, nome, preco });
    res.status(201).json({ mensagem: 'Produto adicionado com sucesso!' });
});

// Rota GET para listar
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080 🌺');
});