import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './Form.scss';
import { Title } from '../Title/Title';
import { Loader } from '../Loader/Loader';
import { Success } from '../Success/Success';
import { useDispatch, useSelector } from 'react-redux';
import {
  setName, setEmail, setPhone, setPhoto, setPosition,
  getToken, getPositions, addUser, resetFormData,
} from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { IPosition } from '../../types/IPosition';
import { IPhoto } from '../../types/IPhoto';

export const Form: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.formInfo.token);
  const positions = useSelector((state: RootState) => state.formInfo.positions);
  const formData = useSelector((state: RootState) => state.formData);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const getPositionValues = () => {
      const URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          dispatch(getPositions(data.positions));
        })
        .catch(error => {
          throw new Error(error);
        });
    }

    const getTokenValue = () => {
      const URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          dispatch(getToken(data.token));
        })
        .catch(error => {
          throw new Error(error);
        });
    }

    getPositionValues();
    getTokenValue();
  }, [dispatch]);

  if (!formData) {
    return <p>No data</p>;
  }
  const { name, email, phone, position, position_id, photo } = formData;
  interface IError {
    name: string;
    email: string;
    phone: string;
    position: string;
    photo: string; 
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setName(value));
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setEmail(value));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      const img = new Image();
      img.onload = () => {
        dispatch(setPhoto({ file, width: img.width, height: img.height }));
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setPhone(value));
  };

  const handleFocusPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value.startsWith('+38')) {
      dispatch(setPhone('+38'));
    }
  }

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const foundPosition = positions.find((position: IPosition) => position.name === value);

    if (foundPosition) {
      dispatch(setPosition(foundPosition));
    }
  };

  const validateName = (name: string) => {
    if (!name) {
      return 'Name is required';
    }
    if (name.length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (name.length > 60) {
      return 'Name cannot exceed 60 characters';
    }

    return '';
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return 'Email is required';
    }
    if (!emailPattern.test(email)) {
      return 'Invalid email format';
    }

    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      return 'Phone is required';
    }

    const formatedPhone = phone.replace(/(?!^\+)\D/g, ''); // preserve '+' and digits
    if (formatedPhone.length !== 13) { // 13 digits (including the +380 prefix)
      return 'Phone must have 12 digits';
    }
    if (!formatedPhone.startsWith('+380')) {
      return 'Phone number must start with +380';
    }

    return '';
  };

  const validatePosition = (position: string) => {
    if (!position) {
      return 'Position is required';
    }

    return '';
  };

  const validatePhoto = (photo: IPhoto) => {
    if (photo.file === null) {
      return 'Photo is required';
    }

    const allowedTypes = ['image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(photo.type)) {
      return 'Only JPG/JPEG images are allowed';
    }

    if (photo.size > 5 * 1024 * 1024) {
      return 'File size must not exceed 5MB';
    }

    if (photo.width < 70 && photo.height < 70) {
      return 'Image resolution must be at least 70px*70px';
    }

    return '';
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const positionError = validatePosition(position);
    const photoError = validatePhoto(photo);

    if (nameError || emailError || phoneError || positionError || photoError) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError,
        position: positionError,
        photo: photoError,
      });
      return;
    }

    setIsLoading(true);

    const newFormData = new FormData(); 
    const fileField = document.querySelector('input#file') as HTMLInputElement;

    const phormatedPhone = (phoneNumber: string) => {
      return phoneNumber.replace(/(?!^\+)\D/g, '');
    }

    newFormData.append('position_id', position_id.toString());
    newFormData.append('name', name);
    newFormData.append('email', email);
    newFormData.append('phone', phormatedPhone(phone));

    if (fileField && fileField.files && fileField.files.length > 0) {
      newFormData.append('photo', fileField.files[0]);
    }

    const URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
    fetch(URL, {
      method: 'POST',
      body: newFormData,
      headers: {
        'Token': token,
      }})
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const id = data.user_id;

        if(data.success) {
          fetch(`${URL}/${id}`)
          .then(response => response.json())
          .then(data => {
            dispatch(addUser(data.user));
            setSuccess(true);

            // Reset form data and errors
            dispatch(resetFormData()); 
            setErrors(null);
          })
          .catch(error => {
            throw new Error(error);
          });
        } else {
          if (data.message) {
            alert("Unknown server error occurred. Please try again.");
          } else {
            alert("Unknown server error occurred.");
          }
        }
      })
      .catch(function(error) {
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="form">
      <div className="container">
        {!success ? (
          <>
            <Title className="form__title">
              Working with POST request
            </Title>

            <div className="form__form-wrap">
              <form className="form__form" onSubmit={handleSubmit}>
                <div className="form__input-wrap">
                  {errors?.name && <div className="form__error">{errors.name}</div>}
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Your name"
                  />
                  {name && <div className="form__label-text">Your name</div>}
                </div>
                <div className="form__input-wrap">
                  {errors?.email && <div className="form__error">{errors.email}</div>}
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                  />
                  {email && <div className="form__label-text">Email</div>}

                </div>
                <div className="form__input-wrap">
                  {errors?.phone && <div className="form__error">{errors.phone}</div>}
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={handleChangePhone}
                    onFocus={handleFocusPhone}
                    placeholder="Phone"
                  />
                  {phone && <div className="form__label-text">Phone</div>}
                  {!errors?.phone && 
                    (<div className="form__input-template">
                      +38 (XXX) XXX - XX - XX
                    </div>)
                  }
                </div>

                <div className="form__input-wrap">
                  {errors?.position && <div className="form__error">{errors.position}</div>}
                  <p>Select your position:</p>
                  <div className="form__radio-wrap">
                    {positions.map((pos: IPosition) => {
                      const { id, name } = pos;
                      return (
                        <label key={id}>
                          <input
                            type="radio"
                            name="position"
                            value={name}
                            checked={pos.name === position}
                            onChange={handleChangeRadio}
                            
                          />
                          {pos.name}
                          <div className="form__radio-indicator"></div>
                        </label>
                      )
                    })}
                  </div>
                </div>

                <div className="form__file-wrap">
                  {errors?.photo && <div className="form__error">{errors.photo}</div>}
                  <label className="form__file-label" htmlFor="file">
                    Upload
                  </label>
                  <div className="form__file-text" id="file-name">
                    {photo.name}
                  </div>
                  <input type="file" id="file" name="photo" onChange={handleFileChange} />
                </div>

                <div className="form__button-wrap">
                  <button 
                    type="submit" 
                    className="button button--cta"
                    disabled={
                      !(name && email && phone && position && photo.size && !isLoading)
                    }
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>

            {isLoading && <Loader />}
          </>

        ) : (
          <>
            <div className="form__back" onClick={() => setSuccess(false)}>
              ← Back to the form
            </div>
            <Success />
          </>
        )}
      </div>
    </section>
  );
}
