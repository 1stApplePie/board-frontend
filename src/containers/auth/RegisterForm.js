import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../../node_modules/react-redux/dist/react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from '../../modules/user'; 
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user} = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
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
        const {username, password, passwordConfirm } = form;
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({ form: 'register', key: 'password', value: ''}));
            dispatch(
                changeField({ form: 'register', key: 'passwordConfirm', value: ''})
            );
            return;
        }
        dispatch(register({ username, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            // 계정명 중복 처리
            if (authError.response.status === 409) {
                setError('이미 존재하는 아이디입니다.');
                return;
            }
            // etc...
            setError('Error! unknown reason');
            console.log(authError);
            return;
        }
        if (auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            console.log('check API success');
            console.log(user);
        }
    }, [user]);

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    return (
        <AuthForm
            type='register'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default RegisterForm;