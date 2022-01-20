const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
AdminJS.registerAdapter(AdminJSMongoose)

const User = mongoose.model('User', {
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ['admin', 'restricted'], required: true },
})

const adminJs = new AdminJS({
    databases: [mongoose],
    resources: [{
        resource: User,
        options: {
            properties: {
                encryptedPassword: {
                    isVisible: false,
                },
                password: {
                    type: 'string',
                    isVisible: {
                        list: false, edit: true, filter: false, show: false,
                    },
                },
            },
            actions: {
                new: {
                    before: async (request) => {
                        if(request.payload.password) {
                            request.payload = {
                                ...request.payload,
                                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                                password: undefined,
                            }
                        }
                        return request
                    },
                }
            }
        }
    }],
    rootPath: '/admin',
})

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: '0ab7a7e492383ffcfc14232b286372a2',
})

module.exports=router