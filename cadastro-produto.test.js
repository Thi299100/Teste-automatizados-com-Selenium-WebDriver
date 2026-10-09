
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("node:assert/strict");
npm init -y

async function testeCadastroProduto() {
    const driver = await new Builder()
        .forBrowser("chrome")
        .build();

    const nomeProduto = "Produto Teste Selenium";

    try {
        // 1. Abre a aplicação
        await driver.get("http://localhost:4200");

        await driver.wait(
            until.elementLocated(By.css("body")),
            10000
        );

        console.log("1. Aplicação aberta.");

        // 2. Procura os campos do formulário
        const campos = await driver.findElements(By.css("input"));

        if (campos.length === 0) {
            throw new Error(
                "Nenhum campo foi encontrado. Verifique a página de cadastro."
            );
        }

        console.log("2. Campos encontrados:", campos.length);

        // 3. Preenche os campos de texto
        // Este exemplo usa os primeiros campos disponíveis.
        // Confirme a ordem deles no formulário real.
        await campos[0].sendKeys(nomeProduto);

        if (campos.length > 1) {
            await campos[1].sendKeys("Produto criado para teste automatizado");
        }

        if (campos.length > 2) {
            await campos[2].sendKeys("25.90");
        }

        if (campos.length > 3) {
            await campos[3].sendKeys("10");
        }

        console.log("3. Campos preenchidos.");

        // 4. Localiza um botão para enviar o formulário
        const botoes = await driver.findElements(
            By.css('button[type="submit"], input[type="submit"]')
        );

        if (botoes.length === 0) {
            throw new Error(
                "Botão de cadastro não encontrado."
            );
        }

        await botoes[0].click();

        console.log("4. Botão de cadastro acionado.");

        // 5. Aguarda uma possível atualização da página
        await driver.sleep(1500);

        const pagina = await driver.findElement(By.css("body"));
        const textoPagina = await pagina.getText();

        // 6. Verifica se o nome aparece na página
        if (textoPagina.includes(nomeProduto)) {
            console.log("5. O nome do produto apareceu na página.");
            console.log("Verifique se ele aparece na lista de produtos.");
        } else {
            console.log(
                "O resultado precisa ser conferido na aplicação."
            );
            console.log(textoPagina);
        }

    } catch (erro) {
        console.error("ERRO NO TESTE:", erro.message);
        process.exitCode = 1;

    } finally {
        await driver.quit();
        console.log("Navegador fechado.");
    }
}

testeCadastroProduto(); 
npm install selenium-webdriver
