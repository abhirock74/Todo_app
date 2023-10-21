const User = require('../../Models/user');



module.exports = {

  updateUser: async (req, res) => {
    // req.body['img_url'] = req.file.path;
    const img_url = req.file && req.file.path
    try {
      const user = await User.findByIdAndUpdate(req.params, {img_url},{new:true})
      return res.status(200).json({ message: "Profile updated successfull", user: { name: user.name, gender: user.gender, email: user.email, _id: user._id, phone: user.phone, address: user.address, img_url:user.img_url} })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  deleteUser: async (req, res) => {

    try {
      const user = await User.findByIdAndDelete(req.params)
      return res.status(200).json({ message: "Your Account was successfull delete", user })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },


}