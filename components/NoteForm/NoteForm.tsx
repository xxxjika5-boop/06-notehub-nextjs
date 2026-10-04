"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

export interface NoteFormProps {
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: string;
}


const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Min 3 characters")
    .max(50, "Max 50 characters")
    .required("Required"),

  content: Yup.string()
    .max(500, "Max 500 characters")
    .optional(),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

const initialValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  
  const mutation = useMutation({
    mutationFn: (values: FormValues) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values);
    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onSuccess}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
