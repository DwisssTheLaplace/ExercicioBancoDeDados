var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Pool = require('pg').Pool;
var readlineSync = require('readline-sync');
/*
CREATE TABLE public.aluno(
    nome VARCHAR(100),
    idade INTEGER,
    serie CHAR(7),
    notaMat INTEGER,
    notaGeo INTEGER,
    notaHist INTEGER
)
*/
var dbConfig = {
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030',
    port: 5432,
};
var pool = new Pool(dbConfig);
function media(materia) {
    return __awaiter(this, void 0, void 0, function () {
        var soma, i, notaTemp, mediaFinal;
        return __generator(this, function (_a) {
            console.log("\nDigite suas 8 notas de ".concat(materia, ":"));
            soma = 0;
            for (i = 1; i <= 8; i++) {
                notaTemp = readlineSync.questionFloat("Nota da P".concat(i, ": "));
                if (!notaTemp)
                    notaTemp = 0;
                soma += notaTemp;
            }
            mediaFinal = soma / 8;
            console.log("Media de ".concat(materia, ": ").concat(mediaFinal.toFixed(2), "\n"));
            return [2 /*return*/, mediaFinal];
        });
    });
}
function registro() {
    return __awaiter(this, void 0, void 0, function () {
        var nome, idade, serie, notaMat, notaGeo, notaHist, client, insertQuery, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("--------- Cadastro de Aluno ----------");
                    nome = readlineSync.question('Nome: ');
                    idade = readlineSync.questionInt('Idade: ');
                    serie = readlineSync.question('Serie (ex: 1A - EM): ');
                    return [4 /*yield*/, media("Matematica")];
                case 1:
                    notaMat = _a.sent();
                    return [4 /*yield*/, media("Geografia")];
                case 2:
                    notaGeo = _a.sent();
                    return [4 /*yield*/, media("Historia")];
                case 3:
                    notaHist = _a.sent();
                    if (!(!nome || !idade || !serie)) return [3 /*break*/, 5];
                    console.error("Erro: Todos os campos sao obrigatorios!");
                    return [4 /*yield*/, pool.end()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
                case 5:
                    _a.trys.push([5, 8, 9, 11]);
                    return [4 /*yield*/, pool.connect()];
                case 6:
                    client = _a.sent();
                    insertQuery = "\n      INSERT INTO aluno (nome, idade, serie, notaMat, notaGeo, notaHist)\n      VALUES ($1, $2, $3, $4, $5, $6)\n    ";
                    return [4 /*yield*/, client.query(insertQuery, [nome, idade, serie, notaMat, notaGeo, notaHist])];
                case 7:
                    _a.sent();
                    client.release();
                    console.log(" Aluno ".concat(nome, " cadastrado com sucesso!"));
                    return [3 /*break*/, 11];
                case 8:
                    error_1 = _a.sent();
                    console.error("Erro ao salvar no banco:", error_1);
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, pool.end()];
                case 10:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
registro();
