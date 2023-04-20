import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const formSchema = yup.object().shape({
  title: yup
    .string()
    .required("Task başlığı yazmalısınız")
    .min(3, "Task başlığı en az 3 karakter olmalı"),
  description: yup
    .string()
    .required("Task açıklaması yazmalısınız")
    .min(10, "Task açıklaması en az 10 karakter olmalı"),
  people: yup
    .array()
    .max(3, "En fazla 3 kişi seçebilirsiniz")
    .min(1, "Lütfen en az bir kişi seçin"),
});

export default function TaskHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });
  const kisiler = [
    { value: "Ömer", label: "Ömer" },
    { value: "Emre", label: "Emre" },
    { value: "Burcu", label: "Burcu" },
  ];

  const defaultValues = {
    title: "",
    description: "",
    people: [],
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    people: [],
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const submitFn = (data) => {
    console.log(data);
  };

  const formAlaniniKontrolEt = (name, value) => {
    // form alanlarının geçerliliğini kontrol etmek için kullanılabilir
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    formAlaniniKontrolEt(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handlePeopleChange = (selectedOptions) => {
    const people = selectedOptions.map((option) => option.value);
    formAlaniniKontrolEt("people", people);
    setFormData({ ...formData, people });
  };

  useEffect(() => {
    setButtonDisabled(!isValid);
  }, [isValid]);

  return (
    <form className="task-Form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title")}
          onChange={handleInputChange}
        />{" "}
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>

        <textarea
          className="input-textarea"
          id="description"
          name="description"
          {...register("description")}
          onChange={handleInputChange}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="people">
          Kişiler
          <Select
            id="people"
            name="people"
            options={kisiler} // Değiştirilmesi gereken satır
            isMulti
            onChange={handlePeopleChange}
            defaultValue={defaultValues.people} // Değiştirilmesi gereken satır
          />{" "}
        </label>
      </div>
      {errors.people && <span>{errors.people.message}</span>}
    </form>
  );
}
