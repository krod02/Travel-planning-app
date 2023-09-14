import {cleanEnv, str, port} from 'envalid';

function validateEnv(){
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production', 'test']
        }),
        MYSQL_HOST: str(),
        MYSQL_USER: str(),
        MYSQL_PASSWORD: str(),
        MYSQL_DATABASE: str(),
        PORT: port({default: 5000})
    })
}

export default validateEnv;