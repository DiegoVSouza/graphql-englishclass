const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource{
    constructor(){
        super()
        this.baseURL = 'http://localhost:3000'
        this.respostaCreate ={
            code: 201,
            mensagem: 'usuário criado com sucesso'
        }
        this.respostaCustom ={
            code: 200,
            mensagem: 'operação efetuada com sucesso'
        }
        this.respostaError = (msg)=>{
            return{
                code: 400,
                mensagem: msg
            }
        }
        this.emptyUser = {
            name: '',
            ativo:'',
            role:{
                id: 0,
                type: 'ESTUDANTE'
            }
        }
    }

    async getUsers(){
        const users = await this.get('/users')

        return users.map(async user =>({
            id: user.id,
            nome: user.nome,
            email: user.email,
            ativo: user.ativo,
            role: await this.get(`/roles/${user.role}`)
        }))

    }
    async getUserById(id){
        const user = await this.get(`/users/${id}`)
        console.log(user)
        user.role = await this.get(`/roles/${user.role}`)
        return user
    }
    async  adicionaUser(user){
        try {
            const users = await this.get('/users')
        user.id = users.length + 1
        const role = await this.get(`roles?type=${user.role}`)
        await this.post('users', {...user, role: role[0].id})
        return({
            ...this.respostaCreate,
            user:{
                ...user,
                role: role[0]
            }
        })
        } catch (error) {
            return{
                ...this.respostaError(error.message),
                user: this.emptyUser         
            }
        }
        
    }
    async  atualizaUser(novosDados){
        try {
            const role = await this.get(`/role?type${novosDados.user.role}`)
        await this.put(`users/${novosDados.id}`,{
            ...novosDados.user,
            role: role[0].id
        })

        return ({
            ...this.respostaCustom,
            user:{
                ...novosDados.user,
                role: role[0]
            }
        })
        } catch (error) {
            return{
                ...this.respostaError(error.message),
                user: this.emptyUser         
            }
        }
        
    }

    async deletaUser(id){
        try {
            await this.delete(`users/${id}`)
            return this.respostaCustom
        } catch (error) {
            return this.respostaError(error.message)
            
        }
       
    }
}

module.exports = UsersAPI