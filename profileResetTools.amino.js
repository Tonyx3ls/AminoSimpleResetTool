const readline = require('readline');
const figlet = require('figlet');

async function showTittle(){
    return new Promise((resolve, reject) => {

        figlet('Profile Reset', function(err, data) {
        if (err) {
            reject('sh*t figlet failed!!!');
            return;
        }
            console.log(data)
            resolve();
        });
    
    
 });
}

async function main(){
	 
    await showTittle();
    let rl = readline.createInterface(process.stdin, process.stdout);

    rl.question('Ingresa tu correo electronico\n>', (respuesta)=>{
    	console.log(`sapo qlao tu correo es ${respuesta}`);
    	process.exit();
    });
}

main();
