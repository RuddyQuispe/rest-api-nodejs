import connectionDB from '../../../config/database';

class UserPhotographerModel {

    constructor() {
        console.log("Initilized UserPhotographer Model");
    }
    /**
     * Get list user photographer
     */
    async getListUserPhotographer() {
        try {
            const listUserPhotographers = await connectionDB.query(`select pu.code, pu."name", pu.email, pu.status, ps."name" name_studio, array(select (id_social, description)::text from photo_social where code_photographer=pu.code) from photographer_user pu, photo_studio ps where pu.id_studio=ps.id`);
            return listUserPhotographers.rows;
        } catch (error) {
            console.error("Error in createUserPhotographer()", error);
            return null;
        }
    }

    /**
     * Get data specified user photograph
     * @param {integer} code : code photographer user
     */
    async getDataUserPhotographer(code) {
        try {
            const userPhotographers = await connectionDB.query(`select pu.code, pu."name", pu.email, pu.status, ps."name" name_studio from photographer_user pu, photo_studio ps where pu.id_studio=ps.id and pu.code=${code}`);
            return userPhotographers.rows[0];
        } catch (error) {
            console.error("Error in getDataUserPhotographer()", error);
            return null;
        }
    }

    /**
     * return data user photographer for login system
     * @param {string} email : email user login
     */
    async getLoginUserData(email) {
        try {
            const userPhotographerLogin = await connectionDB.query(`select code, email, "name", "password", status from photographer_user where email='${email}'`);
            return userPhotographerLogin.rows[0];
        } catch (error) {
            console.error("Error in getLoginUserData()", error);
            return null;
        }
    }

    /**
     * create account user photographer
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @param {integer} idStudio 
     */
    async createUserPhotographer(name, email, password, idStudio) {
        try {
            console.log(name, email, password, idStudio);
            const result = await connectionDB.query(`insert into photographer_user("name", email, status, "password", id_studio) values ('${name}', '${email}', true, '${password}', ${idStudio}) returning code`);
            return result.rows[0].code;
        } catch (error) {
            console.error("Error in createUserPhotographer(name, email, password, idStudio)", error);
            return -1;
        }
    }

    /**
     * change password user account
     * @param {integer} email : email user
     * @param {string} password : new password
     */
    async changePasswordUser(email, password) {
        try {
            const result = await connectionDB.query(`update photographer_user set "password"='${password}' where email='${email}'`);
            console.log("result update passwod: ", result);
            return true;
        } catch (error) {
            console.log("Error in changePasswordUser(email, password)", error);
            return false;
        }
    }

    /**
     * update status account user photographer
     * @param {integer} codeUser : code user
     */
    async enableDisablePhotographer(codeUser) {
        try {
            await connectionDB.query(`update photographer_user set status=not status where code=${codeUser}`);
            return true;
        } catch (error) {
            console.log("Error in enableDisablePhotographer(codeUser)", error);
            return false;
        }
    }
}

export const userPhotographer = new UserPhotographerModel();