import React, { useState } from 'react';
import { Button, Upload, Breadcrumb } from 'antd';
import { Input } from 'formik-antd';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DashBoard } from '../../Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import router from '../../../router';
import { showError, showSuccess } from '../../../utils/appUtils';
import { InputCustom } from '../../../components/InputCustom';
import { usersActions} from '../../../redux/actions';

const { TextArea } = Input;
export const AddCustomer = () => {
    const history = useHistory();
    const router = useHistory()
    const DetailCustomer = useSelector((state: any) => state?.customer?.DetailCustomer)
    const dispatch = useDispatch()
    let { id } = useParams();

    React.useEffect(() => {
        (async () => {
            if (id) await usersActions.getDetailCustomer(id, dispatch)
        })()
    }, [id])


    const validationSchema = yup.object().shape({
        email_address: yup.string().email("Nhập địa chỉ Email hợp lệ").required('Vui lòng đầy đủ thông tin.'),
        first_name: yup.string().required('Vui lòng điền đầy đủ thông tin.'),
        last_name: yup.string().required('Vui lòng điền đầy đủ thông tin.'),
        job_title: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        business_phone: yup.number().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        home_phone: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        mobile_phone: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        company: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        fax_number: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        address: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        city: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        state_province: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        zip_postal_code: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        country_region: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        web_page: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        notes: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
        attachments: yup.string().typeError('Vui lòng điền đầy đủ thông tin.').nullable(true),
    })

    const initialValues = {
        email_address: id ? DetailCustomer?.email_address : '',
        first_name: id ? DetailCustomer?.first_name : '',
        last_name: id ? DetailCustomer?.last_name : '',
        company: id ? DetailCustomer?.company : '',
        job_title: id ? DetailCustomer?.job_title : '',
        business_phone: id ? DetailCustomer?.business_phone : '',
        mobile_phone: id ? DetailCustomer?.mobile_phone : '',
        home_phone: id ? DetailCustomer?.home_phone : '',
        fax_number: id ? DetailCustomer?.fax_number : '',
        address: id ? DetailCustomer?.address : '',
        city: id ? DetailCustomer?.city : '',
        state_province: id ? DetailCustomer?.state_province : '',
        zip_postal_code: id ? DetailCustomer?.zip_postal_code : '',
        country_region: id ? DetailCustomer?.country_region : '',
        web_page: id ? DetailCustomer?.web_page : '',
        notes: id ? DetailCustomer?.notes : '',
        attachments: id ? DetailCustomer?.attachments : ''
    }

    return (
        <DashBoard>
            <div className="contai-add">
                <Link to="/admin">
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                </Link>
                <Link to="/admin/Customer">
                    <Breadcrumb.Item>Customer</Breadcrumb.Item>
                </Link>
                <Breadcrumb.Item className="name_P">
                    {id ? 'Cập nhật' : '  Thêm Customer '}
                </Breadcrumb.Item>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={async (values: any) => {
                        let data: any = {
                            company: values.company,
                            last_name: values.last_name,
                            first_name: values.first_name,
                            email_address: values.email_address,
                            job_title: values.job_title,
                            business_phone: values.business_phone,
                            home_phone: values.home_phone,
                            mobile_phone: values.mobile_phone,
                            fax_number: values.fax_number,
                            address: values.address,
                            city: values.city,
                            state_province: values.state_province,
                            zip_postal_code: values.zip_postal_code,
                            country_region: values.country_region,
                            web_page: values.web_page,
                            notes: values.notes,
                            attachments: values.attachments
                        }
                        if (!id) {
                            let { messenger, status }: any =
                                await usersActions.onAddCustomer(data, dispatch)
                            if (status) {
                                showSuccess(messenger)
                                router.push("/admin/Customer");
                            } else {
                                showError(messenger);
                            }
                        } else {
                            delete data.email_address
                            let { messenger, status }: any =
                                await usersActions.onUpdateCustomer({
                                    id,
                                    data
                                }, dispatch)
                            if (status) {
                                showSuccess(messenger)
                                router.push("/admin/Customer");
                            } else {
                                showError(messenger);
                            }
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
                                <InputCustom
                                    title={"Email"}
                                    handleChange={handleChange}
                                    values={values.email_address}
                                    errors={errors.email_address}
                                    touched={touched.email_address}
                                    name={'email_address'}
                                />
                                <InputCustom
                                    title={"First name"}
                                    handleChange={handleChange}
                                    values={values.first_name}
                                    errors={errors.first_name}
                                    touched={touched.first_name}
                                    name={'first_name'}
                                />
                                <InputCustom
                                    title={"Last name"}
                                    handleChange={handleChange}
                                    values={values.last_name}
                                    errors={errors.last_name}
                                    touched={touched.last_name}
                                    name={'last_name'}
                                />
                                <InputCustom
                                    title={"Company"}
                                    handleChange={handleChange}
                                    values={values.company}
                                    errors={errors.company}
                                    touched={touched.company}
                                    name={'company'}
                                />
                                <InputCustom
                                    title={"Job Title"}
                                    handleChange={handleChange}
                                    values={values.job_title}
                                    errors={errors.job_title}
                                    touched={touched.job_title}
                                    name={'job_title'}
                                />
                                <InputCustom
                                    title={"Business Phone"}
                                    handleChange={handleChange}
                                    values={values.business_phone}
                                    errors={errors.business_phone}
                                    touched={touched.business_phone}
                                    name={'business_phone'}
                                />
                                <InputCustom
                                    title={"Home Phone"}
                                    handleChange={handleChange}
                                    values={values.home_phone}
                                    errors={errors.home_phone}
                                    touched={touched.home_phone}
                                    name={'home_phone'}
                                />
                                <InputCustom
                                    title={"Mobile phone"}
                                    handleChange={handleChange}
                                    values={values.mobile_phone}
                                    errors={errors.mobile_phone}
                                    touched={touched.mobile_phone}
                                    name={'mobile_phone'}
                                />
                                <InputCustom
                                    title={"Fax Number"}
                                    handleChange={handleChange}
                                    values={values.fax_number}
                                    errors={errors.fax_number}
                                    touched={touched.fax_number}
                                    name={'fax_number'}
                                />
                                <InputCustom
                                    title={"Address"}
                                    handleChange={handleChange}
                                    values={values.address}
                                    errors={errors.address}
                                    touched={touched.address}
                                    name={'address'}
                                />
                                <InputCustom
                                    title={"city"}
                                    handleChange={handleChange}
                                    values={values.city}
                                    errors={errors.city}
                                    touched={touched.city}
                                    name={'city'}
                                />
                                <InputCustom
                                    title={"State Province"}
                                    handleChange={handleChange}
                                    values={values.state_province}
                                    errors={errors.state_province}
                                    touched={touched.state_province}
                                    name={'state_province'}
                                />
                                <InputCustom
                                    title={"Zip Postal Code"}
                                    handleChange={handleChange}
                                    values={values.zip_postal_code}
                                    errors={errors.zip_postal_code}
                                    touched={touched.zip_postal_code}
                                    name={'zip_postal_code'}
                                />
                                <InputCustom
                                    title={"Country Region"}
                                    handleChange={handleChange}
                                    values={values.country_region}
                                    errors={errors.country_region}
                                    touched={touched.country_region}
                                    name={'country_region'}
                                />
                                <InputCustom
                                    title={"Web Page"}
                                    handleChange={handleChange}
                                    values={values.web_page}
                                    errors={errors.web_page}
                                    touched={touched.web_page}
                                    name={'web_page'}
                                />
                                <InputCustom
                                    title={"Notes"}
                                    handleChange={handleChange}
                                    values={values.notes}
                                    errors={errors.notes}
                                    touched={touched.notes}
                                    name={'notes'}
                                />
                                <InputCustom
                                    title={"attachments"}
                                    handleChange={handleChange}
                                    values={values.attachments}
                                    errors={errors.attachments}
                                    touched={touched.attachments}
                                    name={'attachments'}
                                />
                                <div className="submitForm">
                                    <button type="submit">
                                        {id ? 'Cập nhật' : '  Thêm Customer '}
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

