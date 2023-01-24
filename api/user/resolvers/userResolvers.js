const arrayUsers =[
    {
        nome:'teste',
        ativo: true
    }
]

const userResolvers = {
    Query:{
        users: ()=> arrayUsers,
        primeiroUser: () => arrayUsers[0]
    }
}

module.exports = userResolvers