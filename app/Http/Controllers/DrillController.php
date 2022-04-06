<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDrillRequest;
use App\Http\Requests\UpdateDrillRequest;
use App\Models\Drill;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DrillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        \Debugbar::debug('indexです');
        \Debugbar::debug(Drill::where('user_id', Auth::id())->get());

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
        $request->validate([
            'title' => 'required',
            'problem0' => 'required',
            'problem1' => 'required',
            'problem2' => 'required',
        ]);
        $request['user_id'] = Auth::id();
        Drill::create($request->all());

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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Drill  $drill
     * @return \Illuminate\Http\Response
     */
    public function edit(Drill $drill)
    {
        return Inertia::render('Drill/Edit', ['drill' => $drill]);
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
            'problem0' => 'required',
            'problem1' => 'required',
            'problem2' => 'required',
        ]);
        $drill->update($request->all());

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
