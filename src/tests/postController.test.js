//Testa a criacao, edicao e exclusao de posts
//Atividades ID 25, 26 e 27

//Atividade ID 25
//POST /posts
describe("Tests post creation", () => {
    var req, res, title, content, author;
    it("should verify the post with a lack of title, content, or author", async () => {
        req = {title, content};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(400);
            return this; 
        },
        json: function(responseString){
            expect(responseString).toStrictEqual({ error: 'Campos obrigatórios ausentes: title, content e author.' })
        }};
    });

    it("should create an error for a post that has something other than the intented variables in the request", async () => {
        req = 'test string';
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(500);
            return this; 
        },
        json: function(responseString){
            expect(responseString).toStrictEqual({ error: 'Erro ao criar post.' })
        }};
    });

    it("should create a new post if the title, content, and author veriables are all present", async () => {
        req = {title: "Paragraphs",
            content: "A book about words.",
            author: "John Doe"};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(201);
            return this; 
        },
        json: function(responseNewPost){
            expect(responseNewPost).toBe({newPost})
        }};
    })
});

//Atividade ID 26
//PUT /posts



//Testes extras

//GET /posts
describe("Tests getting posts back from the repository", () => {
    var req, res;
    it("should verify that the posts constant is an array", async () => {
        req = {};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(200);
            return this; 
        },
        json: function(responsePostsList){
            expect(responsePostsList).arrayOf(
                expect.objectContaining({
                    title: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                })
            )
        }};
    });

    it("should create an error for a request with a string", async () => {
        req = 'test string';
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(500);
            return this; 
        },
        json: function(responseString){
            expect(responseString).toStrictEqual({ error: 'Erro ao listar posts.' })
        }};
    });
});

//GET BY KEY-WORD /posts
describe("Tests getting specific posts back from the repository", () => {
    var req, res;
    it("should create an error for not having a term in the request", async () => {
        req = {};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(400);
            return this; 
        },
        json: function(responseString){
            expect(responseString).toStrictEqual({ error: "O termo de busca é obrigatório." })
        }};
    });

    it("should throw an error for an issue in the term query", async () => {
        req = {query: 9990};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(500);
            return this; 
        },
        json: function(responseError){
            expect(responseError).toStrictEqual({ error: error.message, stack: error.stack })
        }};
    });

    it("should return at least one post that possesses the term 'a'", async () => {
        req = {query: 'a'};
        res = {
        json: function(responsePostsList){
            expect(responsePostsList).arrayOf(
                expect.objectContaining({
                    title: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                })
            )
        }};
    })
});