<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\AlphaRule;

class UpdateDrillRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $fl_array = preg_grep("!problem[1-9]|[10]!", array_keys($this->request->all()));

        $rule_list = ['title' => ['required', 'max:60']];
        for ($i = 1; $i <= count($fl_array); $i++) {
            $rule_list['problem' . $i] = ['required', 'max:60', new AlphaRule];
        }

        return $rule_list;
    }
}
