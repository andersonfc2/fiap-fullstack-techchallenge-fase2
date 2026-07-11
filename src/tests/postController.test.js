//Testa a criacao, edicao e exclusao de posts
//Atividades ID 25, 26 e 27

var req, res, title, content, author;

//Atividade ID 25
//POST /posts
describe("Tests post creation", () => {
    it("should verify the post with a lack of title, content, or author", async () => {
        req = {title, content};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(400);
            return this; 
        },
        json: function(responseString) {
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
        json: function(responseString) {
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
        json: function(responseNewPost) {
            expect(responseNewPost).toBe({newPost})
        }};
    })
});

//Atividade ID 26
//PUT /posts



//Atividade ID 28

//GET /posts
describe("Tests getting posts back from the repository", () => {
    it("should verify that the posts constant is an array", async () => {
        req = {};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(200);
            return this; 
        },
        json: function(responsePostsList) {
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
        json: function(responseString) {
            expect(responseString).toStrictEqual({ error: 'Erro ao listar posts.' })
        }};
    });
});

//GET BY KEY-WORD /posts
describe("Tests getting specific posts back from the repository through key words", () => {
    it("should create an error for not having a term in the request", async () => {
        req = {};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(400);
            return this; 
        },
        json: function(responseString) {
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
        json: function(responseError) {
            expect(responseError).toStrictEqual({ error: error.message, stack: error.stack })
        }};
    });

    it("should return at least one post that possesses the term 'a'", async () => {
        req = {query: 'a'};
        res = {
        json: function(responsePostsList) {
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

//GET by ID /posts
describe("Tests getting specific posts back from the repository through an id", () => {
    it("should create an error for not having am id in the request", async () => {
        req = {};
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(500);
            return this; 
        },
        json: function(responseString) {
            expect(responseString).toStrictEqual({ error: 'Erro ao buscar post.' })
        }};
    });

    it("should return a message that a post with an impossible id was not found", async () => {
        req = {
            params: {
                id: 293489304829038
            }
        };
        res = {
        status: function(responseStatus) {
            expect(responseStatus).toBe(404);
            return this; 
        },
        json: function(responseString) {
            expect(responseString).toStrictEqual({ error: 'Post não encontrado.' })
        }};
    });

    it("should return a post that possesses the id '1'", async () => {
        req = {
            params: {
                id: 1
            }
        };
        res = {
        json: function(responsePost) {
            expect(responsePost).arrayOf(
                expect.objectContaining({
                    title: expect.any(String),
                    content: expect.any(String),
                    author: expect.any(String),
                })
            )
        }};
    })
});