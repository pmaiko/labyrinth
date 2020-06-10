import React from 'react';
import { useState, useEffect } from 'react'
// import {store} from '../store'
import materialize from 'materialize-css';
import { useForm } from "react-hook-form";
import {connectRedux} from "../store"

function App (props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const submitForm =  (data) => {
        props.setFormData(
            data.firstName,
            data.level,
            data.speed,
            data.countSteps
        );
    };

    useEffect(() => {
        materialize.AutoInit();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <form className="form col offset-s4 s4 z-depth-5"
                      onSubmit={handleSubmit(submitForm)}>
                    <div className="row">
                        <blockquote>
                            Игра Лабиринт {props.state.formData ? props.state.formData.firstName : ''}
                        </blockquote>
                        <div className="fields">
                            <div className="input-field col s12">
                                <input id="firstName"
                                       type="text"
                                       name="firstName"
                                       ref={register({ required: true, minLength: 2})}
                                       className={errors.firstName ? 'invalid' : ''}
                                />
                                <label htmlFor="firstName">
                                    Введите ваше имя
                                </label>
                                {errors.firstName && <span className="helper-text materialize-red-text">Это поле обязательно к заполнению</span>}
                            </div>
                            <div className="input-field col s12">
                                <select id="level"
                                        name="level"
                                        ref={register}
                                >
                                    <option value="3">Просто</option>
                                    <option value="5">Сложно</option>
                                    <option value="7">Очень сложно</option>
                                </select>
                                <label>Уровень сложности</label>
                            </div>

                            <div className="input-field col s12">
                                <select id="speed"
                                        name="speed"
                                        ref={register}
                                >
                                    <option value="1000">Медленно</option>
                                    <option value="500">Быстро</option>
                                    <option value="100">Очень быстро</option>
                                </select>
                                <label>Скорость</label>
                            </div>

                            <div className="input-field col s12">
                                <select id="countSteps"
                                        name="countSteps"
                                        ref={register}
                                >
                                    <option value="10">10 ходов</option>
                                    <option value="20">20 ходов</option>
                                    <option value="30">30 ходов</option>
                                </select>
                                <label>Количество ходов</label>
                            </div>
                            <div className="input-field col s12 right-align">
                                <input className="waves-effect waves-light btn-small"
                                       type="submit"
                                       value="Стартуем!"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connectRedux(App);
