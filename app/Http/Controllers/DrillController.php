<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDrillRequest;
use App\Http\Requests\UpdateDrillRequest;
use App\Models\Drill;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Problems;

class DrillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Drill/Index', ['drills' => Drill::where('user_id', Auth::id())->get()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Drill/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDrillRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDrillRequest $request)
    {
        $problems = $request->all();
        unset($problems['title']);
        \Debugbar::debug($request->all());
        \Debugbar::debug(count($request->all()));

        $problem_num = count($request->all()) - 1;
        $request['problem_num'] = $problem_num;
        $request['user_id'] = Auth::id();
        $drill = Drill::create($request->all());
        $i = 1;
        \Debugbar::debug($problems);
        foreach ($problems as $problem) {
            \Debugbar::debug($problem);
            $new_record = new Problems();
            $new_record->fill(
                [
                    'content' => $problem,
                    'drill_id' => $drill->id,
                    'order_id' => $i,
                ]
            );
            $new_record->save();
            \Debugbar::debug($new_record);
            $i++;
        }

        return redirect()->route('drill.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Drill  $drill
     * @return \Illuminate\Http\Response
     */
    public function show(Drill $drill)
    {
        $problems = $drill->problems()->get()->toArray();
        return Inertia::render('Drill/Show', ['drill' => $drill, 'problems' => $problems]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Drill  $drill
     * @return \Illuminate\Http\Response
     */
    public function edit(Drill $drill)
    {

        $problems = $drill->problems()->get()->toArray();

        return Inertia::render('Drill/Edit', ['drill' => $drill, 'problems' => $problems]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDrillRequest  $request
     * @param  \App\Models\Drill  $drill
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDrillRequest $request, Drill $drill)
    {
        $request->validate([
            'title' => 'required',
            'problem1' => 'required',
            'problem2' => 'required',
            'problem3' => 'required',
        ]);



        // dd($drill->problems()->get()->toArray());
        // DBと一致しているかどうかを判定する
        // 一致していないものは書き換える
        $problems_list = $drill->problems()->get()->toArray();
        foreach ($problems_list as $problem) {
            $problem_label = 'problem' . $problem['order_id'];
            if ($problem['content'] !== $request->all()[$problem_label]) {

                $new_record = Problems::find($problem['id']);
                $new_record->content = $request->all()[$problem_label];
                $new_record->save();
            }
        }

        return redirect()->route('drill.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Drill  $drill
     * @return \Illuminate\Http\Response
     */
    public function destroy(Drill $drill)
    {
        $drill->delete();
        return redirect()->route('drill.index');
    }
}
