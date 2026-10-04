"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});



interface NoteFormProps {
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      await createNote(values);
      helpers.resetForm();
      onSuccess();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>

      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" className={css.input} />
          <ErrorMessage
            name="title"
            component="p"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            className={css.textarea}
          />
          <ErrorMessage
            name="content"
            component="p"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field
            as="select"
            id="tag"
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage
            name="tag"
            component="p"
            className={css.error}
          />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onSuccess}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
