import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { addressesActions } from 'modules/addresses';
import { AddressConfig, AddressSource } from 'modules/addresses/types';
import { isValidEthAddress, isValidMnemonic, isValidPrivateKey } from 'utils/validators';
import { SOURCE_UI } from 'utils/ui';
import './style.less';

interface DispatchProps {
  addAddress: typeof addressesActions['addAddress'];
  updateAddress: typeof addressesActions['updateAddress'];
  removeAddress: typeof addressesActions['removeAddress'];
}

interface OwnProps {
  address?: AddressConfig;
  isCreating?: boolean;
  onClose(): void;
}

type Props = DispatchProps & OwnProps;

interface State {
  values: AddressConfig;
  isBackupExpanded: boolean;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class AddressForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isBackupExpanded: !!(props.address && props.address.backup),
      values: {
        address: '',
        label: '',
        source: undefined,
        backup: '',
        ...props.address || {},
      },
    };
  }

  render() {
    const { values, isBackupExpanded } = this.state;
    const errors = this.getErrors();
    const formValidation = (key: string): {
      validateStatus: 'error' | undefined;
      help: string | undefined;
    } => ({
      validateStatus: (values as any)[key] && errors[key] ? 'error' : undefined,
      help: errors[key] || undefined,
    });

    return (
      <Form className="AddressForm" onSubmit={this.handleSubmit}>
        <Form.Item
          className="AddressForm-field"
          label="Label"
          {...formValidation('label')}
          {...formItemLayout}
        >
          <Input name="label" value={values.label} onChange={this.handleInputChange} />
        </Form.Item>
        <Form.Item
          className="AddressForm-field"
          label="Address"
          {...formValidation('address')}
          {...formItemLayout}
        >
          <Input name="address" value={values.address} onChange={this.handleInputChange} />
        </Form.Item>
        <Form.Item
          className="AddressForm-field"
          label="Source"
          {...formValidation('source')}
          {...formItemLayout}
        >
          <Select
            placeholder="Select a source"
            value={values.source}
            onChange={this.handleSourceChange}
          >
            {Object.keys(AddressSource).map(key => {
              const ui = SOURCE_UI[key as AddressSource];
              const SourceIcon = ui.icon;
              return (
                <Select.Option key={key} value={key}>
                  <div className="SourceOption">
                    <SourceIcon
                      className="SourceOption-icon"
                      style={{ fill: ui.color, stroke: ui.color }}
                    />
                    <div className="SourceOption-label">
                      {ui.label}
                    </div>
                  </div>
                </Select.Option>
              );
            })}
          </Select>
          {values.source === AddressSource.PRIVATE_KEY && !isBackupExpanded &&
            <a
              className="AddressForm-field-expand"
              onClick={this.expandBackup}
            >
              + Backup private key
            </a>
          }
        </Form.Item>
        {isBackupExpanded &&
          <Form.Item
            className="AddressForm-field"
            label="Backup"
            {...formValidation('backup')}
            {...formItemLayout}
          >
            <Input.TextArea
              name="backup"
              placeholder="“0x1378…” or “parrot castle…”"
              rows={3}
              value={values.backup}
              onChange={this.handleInputChange}
            />
          </Form.Item>
        }

        <div className="AddressForm-buttons">
          <Button
            className="AddressForm-buttons-button"
            htmlType="submit"
            type="primary"
            disabled={!!Object.keys(errors).length}
          >
            Save
          </Button>
          <Button
            className="AddressForm-buttons-button"
            type="ghost"
            onClick={this.cancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
    );
  }

  private cancel = () => {
    this.props.onClose();
  };

  private handleInputChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = ev.currentTarget;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };

  private handleSourceChange = (source: any) => {
    this.setState({
      values: {
        ...this.state.values,
        source,
      },
    });
  };

  private handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { values } = this.state;
    const { addAddress, updateAddress, onClose, isCreating, address } = this.props;

    if (isCreating) {
      addAddress(values);
    } else {
      if (address) {
        updateAddress({
          oldAddress: address.address,
          newConfig: values,
        });
      }
    }
    onClose();
  };

  private expandBackup = () => {
    this.setState({ isBackupExpanded: true });
  };

  private getErrors = () => {
    const { address, label, source, backup } = this.state.values;
    const errors = {} as any;

    // Address
    if (address) {
      if (!isValidEthAddress(address.trim())) {
        errors.address = 'Invalid address';
      }
    }
    else {
      errors.address = '';
    }

    // Label
    if (label) {
      if (label.length > 40) {
        errors.label = 'Max 40 chars';
      }
    } else {
      errors.label = '';
    }

    // Source
    if (!source) {
      errors.source = '';
    }

    // Backup
    if (backup && !isValidPrivateKey(backup.trim()) && !isValidMnemonic(backup.trim())) {
      errors.backup = 'Invalid private key';
    }

    return errors;
  };
}

export default connect(undefined, {
  addAddress: addressesActions.addAddress,
  removeAddress: addressesActions.removeAddress,
  updateAddress: addressesActions.updateAddress,
})(AddressForm);