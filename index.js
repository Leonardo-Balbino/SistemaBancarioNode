// modulos Externos
const inquirer = require('inquirer')
const chalk = require("chalk")

//modulo interno
const fs = require('fs')
const { parse } = require('path')


console.log("iniciando a aplicação")

operation()

function  operation() {


    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message:'O que deseja fazer',
        choices: [
            'Criar conta',
            'Consultar Saldo', 
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }
]
).then((answer) => {
    const action = answer['action']

    if(action === 'Criar conta') {
        crateAccount()
    } else if (action === 'Consultar Saldo') {
        getAccontBalance()
    } else if (action === 'Depositar') {
        Deposit()

        debugger

    } else if (action === 'Sacar') {
        withdraw()

    } else if (action === 'Sair') {
        elseOperation()
    }



}).catch((err)=>console.log(err))

}


//create an accont

function crateAccount() {
    console.log(chalk.bgGreen.black("Parabens por escolher o nosso banco"))
    console.log(chalk.green("Defina as opçãoes da conta a seguir"))
    buldAccont()

}

//create an accont


// define a conta

    function buldAccont() {

        inquirer.prompt([
            {
                name: 'accountName',
                message: 'digite o nome da sua conta'
            }
        ]).then((answer) => {
            
            answer['accountName'] // obtem o valor direto

            let accountName = (answer['accountName'])
            console.info(accountName)

            //console.log(accountName)

            if(!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.black(`Esta conta já existe, escolha outra! `))
                crateAccount()
                return
            }


            fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){console.log(err)},)


            console.log(chalk.bgGreen("Parabens a conta foi criada"))

            operation()



        }).catch((err)=>console.log(err))
    }
    


    
// define a conta

//encerrar o progrma

function elseOperation() {
    console.log(chalk.bgBlue.black('Obrigado por escolher nossos serviços, volte sempre'))
    process.exit()
}

//encerrar o progrma

// depositar

function Deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta ?'
        }
    ]).then((answer)=>{

        const accountName = answer['accountName']

        if(!checkAcount(accountName)) {
            return Deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual o valor deseja depositar?'   
            }
            
        ]).then((answer)=>{

            const amount = answer['amount']

            //add amount
            addAmount(accountName,amount)





            operation()

        }).catch(err=>console.log(err))


    }).catch(err=>console.log(err))
}

// depositar


//checa conta

function checkAcount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed(`Esta conta não existe, tente novamente`))
        return false
    } else {
        return true
    }
}

//checa conta


// manipula saldo


    function addAmount(accountName, amount) {

        const account = getAccont(accountName)

        if(!amount) {
            console.log(chalk.bgRed.white(`Ocorreu um erro, tente executar a operação novamente`))
            return Deposit()
        }


        accountData = parseFloat(amount)+ parseFloat(account.balance)

        JSON.parse(accountData)

        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": ${accountData}}`)
        console.log(chalk.bgBlue(`Deposito de: ${amount} depositado com sucesso, saldo atual disponivel: ${accountData}`))




    }



    function getAccont(accountName) {
        const accontJson = fs.readFileSync(`accounts/${accountName}.json`, { encoding: 'utf8',flag: 'r'})

        return JSON.parse(accontJson)

    };





// manipula saldo


// verificar saldo

function getAccontBalance() {
    
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta ?'
            }
        ]).then((answer)=>{
    
            const accountName = answer['accountName']
    
            if(!checkAcount(accountName)) {
                return getAccontBalance()
            }

            const accontData = getAccont(accountName)

            console.log(chalk.bgGreen.black(`O valor da sua conta é R$${accontData.balance}`))



            operation()



        }).catch(err=>console.log(err))
}




// verificar saldo



//sacar

function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta ?'
        }
    ]).then((answer)=>{


        const accountName = answer['accountName']

        if(!checkAcount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual o valor deseja Sacar? (-)'   
            }
            
        ]).then((answer)=>{

            const amount = answer['amount']

            //emove amount
            removeAmount(accountName,amount)





           

        }).catch(err=>console.log(err))




    }).catch(err=>console.log(err))
}



//sacar


//remover Amount

function removeAmount(accountName, amount) {

    const account = getAccont(accountName)

    if(!amount) {
        console.log(chalk.bgRed.white(`Ocorreu um erro, tente executar a operação novamente`))
        return withdraw()
    }

    if(account.balance < amount) {
        console.log(chalk.bgRed.black(`Valor insdisponivel`))
        return withdraw()
    }

    accountData = parseFloat(account.balance) - parseFloat(amount) 

   

    JSON.parse(accountData)

    fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": ${accountData}}`)
    console.log(chalk.bgBlue(`Saque de: ${amount} realizado com sucesso, saldo atual disponivel: ${accountData}`))





    return operation()

}





//remover Amount


//remover Amount operatio




//remover Amount operatio

//#region 

//#endregion



