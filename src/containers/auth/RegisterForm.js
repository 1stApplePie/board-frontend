import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../node_modules/react-redux/dist/react-redux";
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth.register
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        // TODO: Implement this function
    }

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    return (
        <AuthForm
            type='register'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default RegisterForm;