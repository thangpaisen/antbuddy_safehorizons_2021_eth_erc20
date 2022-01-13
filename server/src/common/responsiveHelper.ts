export const responsHelper = (req: any,
    res: any,
    error: any,
    data?: any,
    status_code: any = 200) => {
    if (error) {
        return res.json({ status: error })
    }
    return res.status(status_code).json({
        status: "success",
        data: data
    })

}
