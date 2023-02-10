import React from "react";
import './App.css';
import * as yup from "yup";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import classes from "./App.module.scss";
import {useState} from "react";
import cn from "classnames";



function App() {
    const dispatch = useDispatch();
    const {error, list} = useSelector(store => store.form);
    const validationsSchema = yup.object().shape({
        summ: yup.string().required("Введите сумму"),
        card: yup.string().min(19, 'Должно быть 16 цифр').required("Введите номер карты"),
    });

    const [isPopup, setIsPopup] = useState(false);
    const [counter, setCounter] = useState(list.length);

    const showPopup = (isShow) => {
        if (isShow === true) {
            setIsPopup(() => true)
        } else {
            setIsPopup(() => false)
        }
    };

    const removeItem = (id) => {
        let newArr = list.filter((obj) => {
            return obj.id !== id;
        });
        dispatch({type: 'DELETE_ITEM', payload: [...newArr]});
    };

  return (
    <div className="App">
        <div className={classes.wrap}>
            {list.map(item => {
                const date = new Date(item.date);
                const monthNames = ["Январья", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
                ];
                const first = item.card.substring(0, 4);
                const last = item.card.substring(item.card.length - 5);

                return (
                    <div key={item.id} className={classes.listItem}>
                        <div>№{item.number},</div>
                        <div>дата {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}г.,</div>
                        <div>сумма {Number(item.summ.replace(/\s/g, "")).toLocaleString()}р.</div>
                        <div>карта {first} XXXX XXXX {last}</div>
                        <div className={classes.remove} onClick={() => removeItem(item.id)}><div className={classes.cross} /></div>
                    </div>
                )
            })}
            <button className={classes.add} onClick={() => showPopup(true)}>Добавить</button>
            {isPopup && (
                <div className={classes.popup}>
                    <div className={classes.popupWrap}>
                        <Formik initialValues={{
                            summ: '',
                            card: ''
                        }}
                                validateOnBlur
                                onSubmit={(values, {resetForm}) => {
                                    let date = new Date();
                                    setCounter((prev) => prev + 1);
                                    values = {id: +date, number: counter + 1, date: +date, ...values};
                                    dispatch({type: 'FORM', payload: values});
                                    resetForm();
                                    showPopup(false);
                                }}
                                validationSchema={validationsSchema}
                        >
                            {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) =>
                                (
                                    <Form className={classes.form}>
                                        <div>
                                            <label htmlFor="summ">Сумма</label>
                                            <Field
                                                id="summ"
                                                type="text"
                                                name="summ"
                                                placeholder="сумма"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={Number(values.summ.replace(/[^\dA-Z]/g, '')).toLocaleString()}
                                                className={cn(classes.input, { [classes.red]: (touched.summ && errors.summ) || error })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="card">Номер карты</label>
                                            <Field
                                                id="card"
                                                type="text"
                                                name="card"
                                                placeholder="XXXX XXXX XXXX XXXX"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={19}
                                                value={values.card.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                                                className={cn(classes.input, { [classes.red]: (touched.card && errors.card) || error })}
                                            />
                                        </div>
                                        {((touched.summ && errors.summ) || (touched.card && errors.card) || error) && (
                                            <div className={classes.error}>
                                                {error && <span>{error}</span>}
                                                {touched.summ && errors.summ && <span>{errors.summ}</span>}
                                                {touched.summ && errors.summ && touched.card && errors.card && <span>, </span>}
                                                {touched.card && errors.card && <span>{errors.card}</span>}
                                            </div>
                                        )}
                                        <button className={classes.add} type="submit" disabled={!isValid || !dirty}>Отправить</button>
                                    </Form>
                                )
                            }
                        </Formik>
                        <button className={classes.cancel} onClick={() => showPopup(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

export default App;
