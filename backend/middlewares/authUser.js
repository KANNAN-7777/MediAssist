import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token

    if (!token) {
      return res.json({
        success: false,
        message: 'Not Authorized Login Again'
      })
    }

    const tokenDecode = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.userId = tokenDecode.id

    next()
  } catch (error) {
    console.log('AUTH ERROR:', error)

    return res.json({
      success: false,
      message: 'Not Authorized Login Again'
    })
  }
}

export default authUser