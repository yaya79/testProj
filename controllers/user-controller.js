const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Проверьте правильность введенных данных",
            errors.array()
          )
        );
      }
      const { firstName, lastName, phone, municipality, email, password } =
        req.body;
      const userData = await userService.registration(
        firstName,
        lastName,
        phone,
        municipality,
        email,
        password
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async editFairSave(req, res, next) {
    try {
      const {
        id,
        adress,
        contact,
        dateStart,
        dateEnd,
        location,
        organizer,
        timeEnd,
        timeStart,
        tradingPlaces,
        type,
      } = req.body;
      const saveData = await userService.editFairSave(
        id,
        adress,
        contact,
        dateStart,
        dateEnd,
        location,
        organizer,
        timeEnd,
        timeStart,
        tradingPlaces,
        type
      );
      return res.json(saveData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, municipality } = req.body;
      const userData = await userService.login(email, password, municipality);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getFairs(req, res, next) {
    try {
      const fairs = await userService.getUserFair(req.user.municipality);
      return res.json(fairs);
    } catch (e) {
      next(e);
    }
  }

  async getFair(req, res, next) {
    try {
      const editId = req.params;
      const fair = await userService.getEditFair(editId.id);
      return res.json(fair);
    } catch (e) {
      next(e);
    }
  }

  async deleteFair(req, res, next) {
    try {
      const deleteId = req.params;
      const deleteFair = await userService.deleteEditFair(deleteId.id);
      return res.json(deleteFair);
    } catch (e) {
      next(e);
    }
  }

  async getAllData(req, res, next) {
    try {
      const allData = await userService.allData();
      return res.json(allData);
    } catch (e) {
      next(e);
    }
  }

  async newFormSave(req, res, next) {
    try {
      const {
        municipality,
        adress,
        contact,
        dateStart,
        dateEnd,
        location,
        organizer,
        timeEnd,
        timeStart,
        tradingPlaces,
        type,
      } = req.body;
      const saveFair = await userService.newFairSave(
        municipality,
        adress,
        contact,
        dateStart,
        dateEnd,
        location,
        organizer,
        timeEnd,
        timeStart,
        tradingPlaces,
        type
      );
      return res.json(saveFair);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
