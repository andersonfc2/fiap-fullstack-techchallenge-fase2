//Testa a criacao, edicao e exclusao de posts
//Atividades ID 25, 26 e 27

//Atividade ID 25
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