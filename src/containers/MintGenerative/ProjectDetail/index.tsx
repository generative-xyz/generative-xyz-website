import s from './styles.module.scss';
import { Formik } from 'formik';
import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import { IFormValue } from '@interfaces/mint-generative';
import Button from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Select from 'react-select';

type IProductDetailFormValue = Pick<
  IFormValue,
  'name' | 'categories' | 'description' | 'tokenDescription' | 'tags'
>;

// const THIRD_PARTY_SCRIPTS = [
//   {
//     key: 'p5js',
//     value: 'p5js@1.5.0',
//   },
//   {
//     key: 'threejs',
//     value: 'threejs@r124',
//   },
//   {
//     key: 'tonejs',
//     value: 'tonejs@14.8.49',
//   },
// ];

const ProjectDetail: React.FC = (): React.ReactElement => {
  const [categoryOptions] = useState<Array<{ value: string; label: string }>>(
    []
  );

  const validateForm = (
    _: IProductDetailFormValue
  ): IProductDetailFormValue => {
    const errors: IProductDetailFormValue = {} as IProductDetailFormValue;

    return errors;
  };

  const handleSubmit = (): void => {
    // TODO
  };

  return (
    <>
      <div className={s.projectDetail}>
        <div className={s.formWrapper}>
          <Formik
            initialValues={{
              name: '',
              description: '',
              tokenDescription: '',
              tags: [],
              categories: [],
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={s.formItem}>
                  <label className={s.label} htmlFor="name">
                    Name of the piece <sup className={s.requiredTag}>*</sup>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={s.input}
                    placeholder="Provide a detailed description of your item."
                  />
                  {errors.name && touched.name && (
                    <p className={s.error}>{errors.name}</p>
                  )}
                </div>
                <div className={s.formItem}>
                  <label className={s.label} htmlFor="tokenDescription">
                    Generative token description{' '}
                    <sup className={s.requiredTag}>*</sup>
                  </label>
                  <textarea
                    id="tokenDescription"
                    name="tokenDescription"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tokenDescription}
                    className={s.input}
                    rows={4}
                    placeholder="Provide a detailed description of your item."
                  />
                  {errors.tokenDescription && touched.tokenDescription && (
                    <p className={s.error}>{errors.tokenDescription}</p>
                  )}
                </div>
                <div className={s.formItem}>
                  <label className={s.label} htmlFor="description">
                    Collected NFTs description{' '}
                    <sup className={s.requiredTag}>*</sup>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className={s.input}
                    rows={4}
                    placeholder="Provide a detailed description of your item."
                  />
                  {errors.tokenDescription && touched.tokenDescription && (
                    <p className={s.error}>{errors.tokenDescription}</p>
                  )}
                </div>
                <div className={s.formItem}>
                  <label className={s.label} htmlFor="description">
                    Collected NFTs description{' '}
                    <sup className={s.requiredTag}>*</sup>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className={s.input}
                    rows={4}
                    placeholder="Provide a detailed description of your item."
                  />
                  {errors.description && touched.description && (
                    <p className={s.error}>{errors.description}</p>
                  )}
                </div>
                <div className={s.formItem}>
                  <label className={s.label} htmlFor="tags">
                    Hashtag <sup className={s.requiredTag}>*</sup>
                  </label>
                  <TagsInput
                    inputProps={{
                      id: 'tags',
                      name: 'tags',
                      onBlur: handleBlur,
                      placeholder: 'Tag here',
                    }}
                    onChange={(tags: Array<string>) => {
                      setFieldValue('tags', tags);
                    }}
                    value={values.tags}
                    className={s.input}
                    renderLayout={(tagElements, inputElement) => {
                      return (
                        <span className={s.tagsWrapper}>
                          {tagElements}
                          {inputElement}
                        </span>
                      );
                    }}
                    renderTag={props => {
                      const {
                        tag,
                        key,
                        disabled,
                        onRemove,
                        getTagDisplayValue,
                        ...other
                      } = props;
                      return (
                        <span key={key} {...other} className={s.tagItem}>
                          {getTagDisplayValue(tag)}
                          {!disabled && (
                            <span
                              className={s.removeTagBtn}
                              onClick={() => onRemove(key)}
                            >
                              <svg
                                height="14"
                                width="14"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                              </svg>
                            </span>
                          )}
                        </span>
                      );
                    }}
                    renderInput={props => {
                      const { onChange, value, ...other } = props;
                      return (
                        <input
                          type="text"
                          onChange={onChange}
                          value={value}
                          {...other}
                          className={s.tagInput}
                        />
                      );
                    }}
                  />
                  {errors.tags && touched.tags && (
                    <p className={s.error}>{errors.tokenDescription}</p>
                  )}
                </div>
                <div className={s.formItem}>
                  <label className={s.label} htmlFor="category">
                    Category <sup className={s.requiredTag}>*</sup>
                  </label>
                  <Select
                    id="category"
                    isMulti
                    name="categories"
                    options={categoryOptions}
                    className={s.selectInput}
                    classNamePrefix="select"
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      <div className={s.stepFooterWrapper}>
        <footer className={s.stepFooter}>
          <div className={s.container}>
            <div className={s.actionWrapper}>
              <Button
                // disabled={!isProjectWork || !filesSandbox}
                // onClick={handleGoToNextStep}
                className={s.nextBtn}
                sizes="small"
              >
                <SvgInset
                  size={18}
                  svgUrl={`${CDN_URL}/icons/ic-arrow-right-18x18.svg`}
                />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProjectDetail;
