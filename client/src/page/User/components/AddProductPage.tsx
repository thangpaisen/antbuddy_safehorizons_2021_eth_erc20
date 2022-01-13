import React, { useState } from 'react';
import { Button, Upload, Breadcrumb, Select } from 'antd';
import { Input } from 'formik-antd';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { DashBoard } from '../..';
import { BASE_URL } from '../../../utils/configs';
import { InputCustom } from '../../../components';
import { productAction } from '../../../redux/actions';
import { showError, showSuccess, showWarning } from '../../../utils/appUtils';
const { Option } = Select;

const { TextArea } = Input;
export const AddProductPage = () => {
    let listCategories = useSelector((state: any) => state?.product?.listCategories)
    const router = useHistory()
    const dispatch = useDispatch()
    const location = useLocation();
    const detail = location?.state?.detail
    const [fileList, setFileList] = useState<any>([]);
    const [state, setState] = useState<boolean>(false)
    const [valCategory, setValCategory] = useState<any>(null)

    React.useEffect(() => {
        (async () => {
            await productAction.getCategory(dispatch)
        })()
    }, [])

    const props2: any = {
        listType: 'picture',
        className: 'upload-list-inline',
        action: BASE_URL + 'upload',
    };

    const onChangeUpload = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);
    };
    const onAddProduct = () => {
        if (!fileList.length) setState(true);
    }

    const _rederListcategories = () => (
        <Select
            style={{ width: 120 }}
            onChange={handleChange}>
            {
                listCategories?.map((item, index) => (
                    <Option value={item?.id} key={index}>
                        {item?.categoryName}
                    </Option>
                ))
            }
        </Select>
    )

    function handleChange(value) {
        setValCategory(value)
    }

    return (
        <DashBoard>
            <div className="contai-add">
                <Link to="/admin">
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                </Link>
                <Link to="/admin/Product">
                    <Breadcrumb.Item>Product</Breadcrumb.Item>
                </Link>
                <Breadcrumb.Item className="name_P">
                    add Product
                </Breadcrumb.Item>
                <Formik
                    initialValues={{
                        product_name: '',
                        description: '',
                        price: '',
                    }}
                    validationSchema={
                        yup.object().shape({
                            product_name: yup.string().required('Vui lòng điền đầy đủ thông tin.'),
                            description: yup.string().required('Vui lòng điền đầy đủ thông tin.'),
                            price: yup.number().required('Vui lòng điền đầy đủ thông tin.'),
                        })
                    }
                    onSubmit={async (values: any) => {
                        if (!fileList.length) return setState(true);
                        if (!valCategory) return showWarning("Chọn thể loại!!!")
                        let data: any = {
                            categories_id: String(valCategory),
                            product_name: values?.product_name,
                            description: values?.description,
                            price: values?.price,
                            picture: fileList[0]?.response?.data?.url,
                        }
                        let { status, messenger }: any = await productAction.doAddProduct(data, dispatch)
                        if (status) {
                            showSuccess(messenger)
                            router.push('/admin/listProduct')
                        } else {
                            showError(messenger)
                        }
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        errors,
                        touched
                    }) => (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <span>Category</span>
                                    {_rederListcategories()}
                                    <InputCustom
                                        title={"product_name"}
                                        handleChange={handleChange}
                                        values={values.product_name}
                                        errors={errors.product_name}
                                        touched={touched.product_name}
                                        name={'product_name'}
                                    />
                                    <InputCustom
                                        title={"description"}
                                        handleChange={handleChange}
                                        values={values.description}
                                        errors={errors.description}
                                        touched={touched.description}
                                        name={'description'}
                                    />
                                    <InputCustom
                                        title={"price"}
                                        handleChange={handleChange}
                                        values={values.price}
                                        errors={errors.price}
                                        touched={touched.price}
                                        name={'price'}
                                    />
                                </div>
                                <div>
                                    <span>picture</span><br />
                                    <Upload
                                        fileList={fileList}
                                        {...props2}
                                        onChange={onChangeUpload}
                                    >
                                        <Button>
                                            <UploadOutlined />
                                        </Button>
                                    </Upload>
                                    {
                                        state && !fileList.length
                                            ? <span className="errors">
                                                <ExclamationCircleOutlined />&#160; Upload </span>
                                            : ''
                                    }
                                </div>
                                <div className="submitForm">
                                    <button type="submit" onClick={() => onAddProduct()}>
                                        add Product
                                    </button>
                                </div>
                            </form >
                        </div>
                    )}
                </Formik>
            </div >
        </DashBoard>
    );
}

