import React, { Dispatch, FC, SetStateAction, useRef, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { filterColumnSchemaValidation } from '@utils/schemaValidations';

type FilterSchema = z.infer<typeof filterColumnSchemaValidation>;

interface Props {
  columns: {
    value: string;
    label: string;
  }[];
  setFilters: Dispatch<SetStateAction<FilterSchema>>;
}

const getOperatorOptions = (field: string) => {
  if (field === 'total_pageviews' || field === 'total_purchases') {
    return (
      <>
        <option value="equals">Equals</option>
        <option value="greater_than">Greater Than</option>
        <option value="less_than">Less Than</option>
      </>
    );
  } else {
    return (
      <>
        <option value="contains">Contains</option>
        <option value="equals">Equals</option>
        <option value="starts_with">Starts With</option>
        <option value="ends_with">Ends With</option>
        <option value="is_empty">Is Empty</option>
        <option value="is_not_empty">Is Not Empty</option>
        <option value="is_any_of">Is Any Of</option>
      </>
    );
  }
};

const FilterColumn: FC<Props> = ({ columns, setFilters }) => {
  const currentFilterId = useRef(0);
  const close = useRef<HTMLAnchorElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (close.current && dropdownRef.current.classList.contains('show')) {
          close.current.click();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterSchema>({
    resolver: zodResolver(filterColumnSchemaValidation),
    defaultValues: {
      filters: [
        {
          filterId: 0,
          field: '',
          operator: '',
          value: '',
        },
      ],
    },
    mode: 'all',
  });

  const { fields, append, remove, update } = useFieldArray<FilterSchema>({
    control,
    name: 'filters',
  });

  const removeFilter = (index: number) => {
    remove(index);
  };

  const addFilter = () => {
    currentFilterId.current = currentFilterId.current + 1;
    const newFilter = {
      filterId: currentFilterId.current,
      field: '',
      operator: '',
      value: '',
    };
    const currentIndex = fields.length - 1;
    update(currentIndex, {
      ...fields[currentIndex],
      logicalOperator: 'and',
    });

    append(newFilter);
  };
  const onSubmit = (data: FilterSchema) => {
    setFilters(data);
  };
  const handleInputChangeField = (event: any, index: any) => {
    const currentIndex = fields.length - 1;
    const { value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index] = {
      ...updatedFields[index],
      field: value,
      operator: '',
      value: '',
    };
    update(currentIndex, {
      ...updatedFields[currentIndex],
    });
  };
  const handleInputChangeValue = (event: any, index: any) => {
    const currentIndex = fields.length - 1;
    const { value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], value: value };
    update(currentIndex, {
      ...updatedFields[currentIndex],
    });
  };
  const handleInputChangeOperator = (event: any, index: any) => {
    const currentIndex = fields.length - 1;
    const { value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], operator: value };
    update(currentIndex, {
      ...updatedFields[currentIndex],
    });
  };
  return (
    <div
      className="p-3 dropdown-menu min-w-max right-0 top-9 absolute hidden bg-white widget-container rounded-lg border border-extraLightColor"
      id="dropdownFilterTable"
      ref={dropdownRef}
    >
      <h4 className="h4 mb-3">Filters</h4>
      {fields.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((filter, i) => (
            <div key={filter.filterId} className="flex flex-col w-full">
              <div className="inline-flex items-end mb-5">
                <div className="flex flex-col mr-2 relative">
                  <label className="form-label read-only" htmlFor="column">
                    Column
                  </label>
                  <div>
                    <Controller
                      control={control}
                      name={`filters.${i}.field`}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="select"
                          id="column"
                          // onChange={(e) => handleInputChangeField(e,i)}
                          {...register(`filters.${i}.field`, {
                            validate: {
                              required: (value: string) =>
                                value.trim().length > 0,
                            },
                            onChange(event) {
                              handleInputChangeField(event, i);
                            },
                          })}
                          value={field.value}
                        >
                          <option value="" selected hidden>
                            Pick Column
                          </option>

                          {columns.map((column, i) => (
                            <option
                              key={i}
                              value={column.value}
                              selected={column.value === filter.field}
                              hidden={column.value === filter.field}
                            >
                              {column.label}
                            </option>
                          ))}
                        </select>
                      )}
                      defaultValue={''}
                    />
                  </div>

                  {errors.filters &&
                    errors.filters[i] &&
                    errors.filters[i]?.field && (
                      <span
                        className="text-warningColor text-xs absolute"
                        style={{ bottom: -15 }}
                      >
                        {errors.filters[i]?.field?.message}
                      </span>
                    )}
                </div>

                <div className="flex flex-col mr-2 relative">
                  <label className="form-label read-only" htmlFor="operator">
                    Operator
                  </label>
                  <div>
                    <select
                      className="select"
                      {...register(`filters.${i}.operator`, {
                        validate: {
                          required: (value: string) => value.trim().length > 0,
                        },
                        onChange(event) {
                          handleInputChangeOperator(event, i);
                        },
                      })}
                      id="column"
                      value={fields[i].operator}
                    >
                      <option value="" selected hidden>
                        Pick Operator
                      </option>
                      {getOperatorOptions(fields[i].field)}
                    </select>
                  </div>
                  {errors.filters &&
                    errors.filters[i] &&
                    errors.filters[i]?.operator && (
                      <span
                        className="text-warningColor text-xs absolute"
                        style={{ bottom: -15, width: 300 }}
                      >
                        {errors.filters[i]?.operator?.message}
                      </span>
                    )}
                </div>
                <div className="flex flex-col mr-2 max-w-[120px]">
                  <label className="form-label read-only" htmlFor="val">
                    Value
                  </label>
                  <div>
                    <input
                      className="input"
                      placeholder="Input Value"
                      type="text"
                      id="val"
                      {...register(`filters.${i}.value`, {
                        onChange(event) {
                          handleInputChangeValue(event, i);
                        },
                      })}
                      value={fields[i].value}
                    />
                  </div>
                </div>
                <div className="flex items-end pb-1">
                  <button
                    className="text-xl text-darkGrade50 hover:text-darkGrade75 transition-all"
                    onClick={() => removeFilter(i)}
                  >
                    <i className="icon-dismiss-circle"></i>
                  </button>
                </div>
              </div>
              {fields[i + 1] && (
                <div className="flex items-center justify-center mb-2.5 relative logic-switcher__container">
                  <div className="bg-white pl-3 pr-3 relative z-10">
                    <div className="p-1.5 rounded-md inline-flex items-center justify-center bg-greyLight logic-switcher">
                      <div className="logic-switcher__item mr-1 last:mr-0">
                        <input
                          type="radio"
                          id={`and${i}`}
                          value="and"
                          {...register(`filters.${i}.logicalOperator`)}
                        />
                        <label
                          htmlFor={`and${i}`}
                          onClick={() =>
                            setValue(`filters.${i}.logicalOperator`, 'and')
                          }
                        >
                          And
                        </label>
                      </div>
                      <div className="logic-switcher__item mr-1 last:mr-0">
                        <input
                          type="radio"
                          id={`or${i}`}
                          value="or"
                          {...register(`filters.${i}.logicalOperator`)}
                        />
                        <label
                          htmlFor={`or${i}`}
                          onClick={() =>
                            setValue(`filters.${i}.logicalOperator`, 'or')
                          }
                        >
                          Or
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {fields.length < 4 && (
            <div className="flex items-center mb-4">
              <button
                className="text-darkGrade50 items-center inline-flex hover:text-darkGrade75"
                onClick={addFilter}
              >
                <i className="icon-add-circle-line text-xl mr-2.5 font-medium"></i>
                Add Filter
              </button>
            </div>
          )}

          <div className="flex pt-4 justify-end items-center border-t border-extraLightColor">
            <a
              data-bs-toggle="collapse"
              data-bs-target="#dropdownFilterTable"
              className="btn light cursor-pointer"
              ref={close}
            >
              Cancel
            </a>
            <button
              type="submit"
              // data-bs-toggle="collapse"
              // data-bs-target="#dropdownFilterTable"
              className="btn ml-2"
            >
              Apply
            </button>
          </div>
        </form>
      ) : (
        <div className="min-w-[440px]">
          <div className="flex items-center mb-4">
            <button
              className="text-darkGrade50 items-center inline-flex hover:text-darkGrade75"
              onClick={addFilter}
            >
              <i className="icon-add-circle-line text-xl mr-2.5 font-medium"></i>
              Add Filter
            </button>
          </div>

          <div className="flex pt-4 justify-end items-center border-t border-extraLightColor">
            <a
              data-bs-toggle="collapse"
              data-bs-target="#dropdownFilterTable"
              className="btn light cursor-pointer"
              ref={close}
            >
              Cancel
            </a>
            <button
              onClick={() => setFilters({ filters: [] })}
              className="btn ml-2"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterColumn;
