import React, { useState } from 'react';
import './MyForm.css';

// Form에서 받는 Props -> onSubmit 함수 (인자로 form :{...} 을 받는다.)
// form의 name은 문자, description은 문자
type MyFormProps = {
    onSubmit: (form: { baseImg: string; workdir: string }) => void;
};

// onSubmit을 비구조할당하여 받고 type은 MyFormProps
function MyForm({ onSubmit }: MyFormProps) {
    const [form, setForm] = useState({
        baseImg: '',
        workdir: '',
        copy: '',
        run: '',
        cmd: '',
    });

    // form에서 name, description 비구조 할당
    const { baseImg, workdir, copy, run, cmd } = form;

    // e: any로 지정하고 마우스를 올라면 해당 이벤트의 type을 볼 수 있다.
    // onChange 함수가 실행되면 form의 name, description value 변경
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // e: any로 지정하고 마우스를 올라면 해당 이벤트의 type을 볼 수 있다.
    // handleSubmit이 발생하면 기존에 일어나던 이벤트를 없애고
    // form을 인자로 넣어 onSubmit 함수를 실행시킨다
    // form 초기화한다.
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
            baseImg: '',
            workdir: '',
            copy: '',
            run: '',
            cmd: '',
        });
    };

    return (
        <div className="formDiv">
            <form onSubmit={handleSubmit}>
                <div>Base IMG</div>
                <input name="baseImg" value={baseImg} onChange={onChange} />
                <div>Working Directory</div>
                <input name="workdir" value={workdir} onChange={onChange} />
                <div>Copy Directory</div>
                <input name="copy" value={copy} onChange={onChange} />
                <div>Run Script</div>
                <input name="run" value={run} onChange={onChange} />
                <div>CMD Script</div>
                <input name="cmd" value={cmd} onChange={onChange} />
                <div></div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default MyForm;
