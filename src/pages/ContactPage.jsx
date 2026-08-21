import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { validateInquiry } from '../utils/inquiry.js'

const initialValues = { company: '', contact: '', phone: '', email: '', market: '', need: '' }

export default function ContactPage({ page, locale }) {
  const isZh = locale === 'zh'
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const labels = isZh ? { company: '企业名称', contact: '联系人', phone: '联系电话', email: '电子邮箱', market: '目标国家 / 地区', need: '业务需求' } : { company: 'Company', contact: 'Contact person', phone: 'Phone', email: 'Email', market: 'Target market', need: 'Business needs' }
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validateInquiry(values)
    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }
  return <div data-group-page="contact"><PageHero page={page} locale={locale} /><section className="contact-page section-space"><div className="page-shell contact-page-grid"><div><div className="group-content-heading"><span>BUSINESS COOPERATION</span><h2>{isZh ? '告诉我们您的目标' : 'Tell us your goals'}</h2><p>{isZh ? '该表单当前仅为前端交互展示，不连接后端，也不会发送或保存信息。' : 'This form is a frontend-only interaction and does not send or store data.'}</p></div><div className="contact-facts"><article><span>{isZh ? '办公地址' : 'ADDRESS'}</span><strong>{isZh ? '江西省南昌市青山湖区高新大道1918号8栋9楼' : '9F, Building 8, No.1918 Gaoxin Avenue, Nanchang, Jiangxi'}</strong></article><article><span>{isZh ? '业务范围' : 'SERVICE SCOPE'}</span><strong>{isZh ? '企业成长服务与全球化业务连接' : 'Enterprise growth and globalization services'}</strong></article></div></div><form className="inquiry-form" onSubmit={submit} noValidate data-inquiry-ui="frontend-only"><div className="inquiry-fields">{['company', 'contact', 'phone', 'email', 'market'].map((name) => <label key={name}><span>{labels[name]}{['company', 'contact', 'phone'].includes(name) && ' *'}</span><input name={name} type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'} value={values[name]} onChange={update} aria-invalid={Boolean(errors[name])} />{errors[name] && <small>{errors[name] === 'invalid' ? (isZh ? '请填写有效联系电话' : 'Enter a valid phone number') : (isZh ? '此项为必填' : 'Required')}</small>}</label>)}<label className="field-wide"><span>{labels.need} *</span><textarea name="need" rows="5" value={values.need} onChange={update} aria-invalid={Boolean(errors.need)} />{errors.need && <small>{isZh ? '请填写业务需求' : 'Describe your needs'}</small>}</label></div><button type="submit" className="button button-primary">{isZh ? '提交询盘（前端演示）' : 'Submit inquiry (demo)'}</button>{submitted && <p className="form-success" role="status">{isZh ? '信息校验通过。正式上线前需接入集团指定表单接口。' : 'Validation passed. Connect the approved form endpoint before launch.'}</p>}</form></div></section></div>
}
