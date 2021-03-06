import React, { Component } from 'react';
import { translate } from 'react-i18next';

import './OfferTextarea.css';

class OfferTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errorMessage: '',
    };
    this.checkValidity = this.checkValidity.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onValidate) {
      const isValid = this.checkValidity();
      this.props.doValidate(this.props.name, isValid);
      if (isValid) {
        this.props.setValue(this.props.name, this.state.value);
      }
    }
  }

  checkValidity() {
    const { t, required, disabled } = this.props;
    const isValid = true;

    if (this.state.value.trim() === '' && required && !disabled) {
      this.setState({ errorMessage: t('components.UI.offerTextarea.errorEmptyField') });
      return false;
    }

    this.setState({ errorMessage: '' });
    return isValid;
  }

  handleChange(e) {
    const { value } = e.target;

    if (value.length <= 500) this.setState({ value });
    if (value.trim() !== '') this.activateNextField();
    if (value.trim() === '') this.deactivateNextFields();
  }

  activateNextField() {
    if (this.props.name === 'offerBaseDescription') {
      this.props.onChange('offerExtendedDisabled', false);
      if (this.props.offerExtraFilled) {
        this.props.onChange('offerExtraDisabled', false);
      }
    }
    if (this.props.name === 'offerExtendedDescription') {
      this.props.onChange('offerExtraDisabled', false);
      this.props.onChange('priceExtendedRequired', true);
    }
    if (this.props.name === 'offerExtraDescription') {
      this.props.onChange('priceExtraRequired', true);
      this.props.onChange('offerExtraFilled', true);
    }
  }

  deactivateNextFields() {
    if (this.props.name === 'offerBaseDescription') {
      this.props.onChange('offerExtendedDisabled', true);
      this.props.onChange('offerExtraDisabled', true);
    }
    if (this.props.name === 'offerExtendedDescription') {
      this.props.onChange('offerExtraDisabled', true);
      this.props.onChange('priceExtendedRequired', false);
    }
    if (this.props.name === 'offerExtraDescription') {
      this.props.onChange('priceExtraRequired', false);
      this.props.onChange('offerExtraFilled', false);
    }
  }

  render() {
    return (
      <label htmlFor="this.props.name" className="add-form__label">
        <div>{this.props.label}</div>
        <textarea
          className={this.props.disabled
            ? 'add-form__input add-form__input--XL add-form__input--disabled'
            : 'add-form__input add-form__input--XL'
          }
          name={this.props.name}
          value={this.state.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          required={this.props.required}
          onChange={this.handleChange}
        />
        <div className="add-form__error-message">
          {this.state.errorMessage}
        </div>
      </label>
    );
  }
}

export { OfferTextarea };
export default translate('translations', { withRef: true })(OfferTextarea);
