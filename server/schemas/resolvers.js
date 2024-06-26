import Objective from '../models/Objective.js';
import Law from '../models/Law.js';
import Faction from '../models/Faction.js'
import User from '../models/User.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            try {

                // get user._id from the jwt payload using the authMiddleware context which is passed into graphql server (~line 30 of server.js). This retrieves the logged in user without searching the database

                return User.findOne({ _id: context.user._id });

            } catch (error) {
                console.log("Error finding User: ", error)
            }
        },
        objectives: async () => {
            return await Objective.find({});
        },
        laws: async () => {
            return await Law.find({});
        },
        factions: async () => {
            return await Faction.find({});
        },
        
        factions: async () => {
            try {
                return await Faction.find({});
            } catch (error) {
                console.log('Error finding Factions: ', error)
            }
        }
    },
    // create mutations for fetch POST requests for Signup & login
    Mutation: {

        createUser: async (_, args) => {
            try {
                const newUser = await User.create(args)
                const token = signToken(newUser)
                return { user: newUser, token }

            } catch (error) {
                console.log("Error creating User: ", error)
            }
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email});

            
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },

    }
};

export default resolvers